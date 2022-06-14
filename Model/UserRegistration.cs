using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApp.Model
{
    public class UserRegistration
    {
        public string FullName { get; set; } = String.Empty;

        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; } = String.Empty;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = String.Empty;

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; } = String.Empty;
    }
}