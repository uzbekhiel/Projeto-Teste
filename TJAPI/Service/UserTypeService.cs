using TJAPI.Context;
using TJAPI.Entities;
using TJAPI.Service.Interfaces;

namespace TJAPI.Service
{
    public class UserTypeService : IUserTypeService
    {
        private readonly DataContext _context;

        public UserTypeService(DataContext context)
        {
            _context = context;
        }

        public List<UserType> Get() => _context.UserType.ToList();

        public UserType GetBy(int id)
        {
            var type = _context.UserType.FirstOrDefault(x => x.ID_TIPOUSUARIO == id);

            if (type == null)
            {
                throw new Exception("Tipo não encontrado");
            }
            return type;
        }
    }
}
