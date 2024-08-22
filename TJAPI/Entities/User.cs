using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TJAPI.Entities
{
    [Table("Usuario")]
    public class User
    {
        [Key]
        public int ID_USU { get; set; }

        [Required]
        public string NOME_USU { get; set; }

        [Required]
        public string MATR_USU { get; set; }

        [Required]
        public DateTime DATA_NASC { get; set; }

        [Required]
        public string EMAIL { get; set; }

        [Required]
        public string ORIGEM { get; set; }

        [Required]
        public int ID_TIPOUSUARIO { get; set; }

        public virtual UserType UserType { get; set; }

    }
}
