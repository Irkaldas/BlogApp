using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogApp.Model;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace BlogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public AuthController(ILogger<AuthController> logger, IMapper mapper, UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration userRegistration)
        {
            if (userRegistration == null || !ModelState.IsValid)
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
    }
}