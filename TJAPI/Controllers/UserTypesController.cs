using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TJAPI.Authentication;
using TJAPI.Dto;
using TJAPI.Entities;
using TJAPI.Service.Interfaces;

namespace TJAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class UserTypesController : ControllerBase
    {
        private IUserTypeService _service;
        private IMapper _mapper;

        public UserTypesController(IUserTypeService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/UseTypes
        [HttpGet, BasicAuthorization]
        public async Task<ActionResult<IEnumerable<UserType>>> GetUserType()
        {
            return Ok(_service.Get().Select(x=>_mapper.Map<UserTypeResult>(x)));
        }
    }
}
