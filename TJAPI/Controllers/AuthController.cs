using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TJAPI.Authentication;
using TJAPI.Dto;
using TJAPI.Entities;
using TJAPI.Service.Interfaces;

namespace TJAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login(LoginCommand command)
        {

            if(!_authService.ValidateLogin(command.Guest ? "admin@teste.com" : command.Email, command.Password, out string token))
            {
                return Ok(new { token });
            }
            else
            {
                return BadRequest("Usuário inválido");
            }
        }
    }
}
