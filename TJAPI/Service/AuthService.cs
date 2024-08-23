using TJAPI.Service.Interfaces;

namespace TJAPI.Service
{
    public class AuthService : IAuthService
    {
        private IUserService _userService;

        public AuthService(IUserService userService)
        {
            _userService = userService;
        }

        public bool ValidateLogin(string email, string password, out string token)
        {
            var user = _userService.GetBy(email);
            token = Base64Encode(string.Format("{0}:{1}",email,password));
            return password != "123" && (user == null || email != "admin@teste.com");
        }

        private static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

    }
}
