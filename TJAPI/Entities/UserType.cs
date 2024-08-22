using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TJAPI.Entities
{
    [Table("TipoUsuario")]
    public class UserType
    {
        [Key]
        public int ID_TIPOUSUARIO { get; set; }
        public string ORIGEM { get; set; }
        public string DESCR { get; set; }
        public ICollection<User> Users { get;} = new List<User>();
    }
}
