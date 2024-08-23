namespace TJAPI.Dto
{
    public class LoginCommand
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public bool Guest { get; set; }
    }
}
