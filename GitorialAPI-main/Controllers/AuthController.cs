using GitorialAPI.Data.Entities;
using GitorialAPI.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GitorialAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserManager<User> _userManager;

        public AuthController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] UserRegistrationModel userRegistrationModel)
        {
            try
            {
                User user = new User()
                {
                    Email = userRegistrationModel.Email,
                    UserName = userRegistrationModel.Username
                };
                var result = await _userManager.CreateAsync(user, userRegistrationModel.Password);

                if (result.Succeeded)
                    return Ok(result);
                else
                    return BadRequest(result);
            }
            catch
            {
                return StatusCode(500, "Server Error");
            }
        }
        
        [HttpPost("sign-in")]
        public async Task<IActionResult> SignIn([FromBody] LoginModel loginModel)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(loginModel.Email);

                if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
                    //return Ok(user.NormalizedUserName);
                    return Ok(new { UserName = user.NormalizedUserName });


                else
                    return BadRequest(new { message = "Username or Password is incorrect" });
            }
            catch
            {
                return StatusCode(500, "Server Error");
            }
        }
    }
}
