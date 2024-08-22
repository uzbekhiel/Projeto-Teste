using TJAPI.Entities;

namespace TJAPI.Service.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Get(int id);
        User GetBy(string email);
    }
}
