using TJAPI.Entities;

namespace TJAPI.Service.Interfaces
{
    public interface IUserTypeService
    {
        List<UserType> Get();
        UserType GetBy(int id);
    }
}
