namespace TJAPI.Service.Interfaces
{
    public interface IAuthService
    {
        bool ValidateLogin(string email, string password, out string token);
    }
}
