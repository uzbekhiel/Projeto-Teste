using Microsoft.EntityFrameworkCore;
using TJAPI.Context;
using TJAPI.Entities;
using TJAPI.Service.Interfaces;

namespace TJAPI.Service
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public List<User> GetUsers() => _context.User.Include(x=>x.UserType).ToList();

        public User Get(int id)
        {
            var user = _context.User.Include(x => x.UserType).FirstOrDefault(x => x.ID_USU == id);

            if (user == null)
            {
                throw new Exception("Usuário não encontrado");
            }
            return user;
        }
        
        public User GetBy(string email)
        {
            var user = _context.User.FirstOrDefault(x => x.EMAIL == email);

            return user;
        }
    }
}
