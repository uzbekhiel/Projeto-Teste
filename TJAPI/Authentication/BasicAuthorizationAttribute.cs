using Microsoft.AspNetCore.Authorization;

namespace TJAPI.Authentication
{
    public class BasicAuthorizationAttribute: AuthorizeAttribute
    {
        public BasicAuthorizationAttribute()
        {
            AuthenticationSchemes = "Basic";
        }

    }
}
