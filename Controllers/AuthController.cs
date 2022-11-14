using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogApp.Model;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using BlogApp.JwtFeatures;
using System.IdentityModel.Tokens.Jwt;

namespace BlogApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly JwtHandler _jwtHandler;
        public AuthController(JwtHandler jwtHandler, IMapper mapper, UserManager<User> userManager)
        {
            _jwtHandler = jwtHandler;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration userRegistration)
        {
            if (userRegistration is null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userRegistration);

            var res = await _userManager.CreateAsync(user, userRegistration.Password);
            if (!res.Succeeded)
            {
                var errors = res.Errors.Select(e => e.Description);
                return BadRequest(new RegistrationResponse { Errors = errors });
            }

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {
            var user = await _userManager.FindByEmailAsync(userLogin.Email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, userLogin.Password))
            {
                return Unauthorized(new AuthResponse { ErrorMessage = "Authorization error." });
            }

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(
                new
                {
                    AuthResponse = new AuthResponse { IsAuthSuccessful = true, Token = token },
                    User = new
                    {
                        Id = user.Id,
                        Email = user.Email,
                        FullName = user.FullName
                    }
                });

        }
    }
}