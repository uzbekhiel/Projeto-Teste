namespace TJAPI.Dto
{
    public class UserResult
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Matricula { get; set; }
        public string? Origem { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
    }
}
