using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using TJAPI.Service.Interfaces;

namespace TJAPI.Authentication
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private IAuthService _authService;

        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, IAuthService authService) : base(options, logger, encoder)
        {
            _authService = authService;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return Task.FromResult(AuthenticateResult.Fail("Requisição não contém cabelho adequado."));
            }

            var header = Request.Headers["Authorization"].ToString();

            if(!header.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            {
                return Task.FromResult(AuthenticateResult.Fail("Requisição não contém cabelho adequado."));
            }

            var authDecoded = Encoding.UTF8.GetString(
                Convert.FromBase64String(header.Replace("Basic ", "", StringComparison.OrdinalIgnoreCase))
                );


            var split = authDecoded.Split(':', 2);

            if (split.Length != 2)
            {
                return Task.FromResult(AuthenticateResult.Fail("Cabelho da requisição com formato inválido."));
            }

            var userMail = split[0];
            var userSecret = split[1];
            if(_authService.ValidateLogin(userMail, userSecret, out string token))
            {
                return Task.FromResult(AuthenticateResult.Fail("Usuário inválido"));
            }

            var client = new BasicAuthenticationClient
            {
                AuthenticationType = "Basic",
                IsAuthenticated = true,
                Name = userMail,
            };

            var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(client, new[]
            {
                new Claim(ClaimTypes.Name, userMail),
            }));

            return Task.FromResult(AuthenticateResult.Success(
                
                new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
        }
    }
}
