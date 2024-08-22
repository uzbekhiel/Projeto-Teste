using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TJAPI.Authentication;
using TJAPI.Context;
using TJAPI.Dto;
using TJAPI.Entities;
using TJAPI.Service.Interfaces;

namespace TJAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private IUserService _service;
        private IMapper _mapper;

        public UsersController(DataContext context, IUserService service,IMapper mapper)
        {
            _context = context;
            _service = service;
            _mapper = mapper;
        }

        /// <summary>
        /// Recupera a lista de usuários cadastrados na base
        /// </summary>
        /// <returns>Lista de usuários</returns>
        /// <response code="200">Lista com os dados dos usuários</response>
        [HttpGet, BasicAuthorization]
        public async Task<ActionResult<IEnumerable<UserResult>>> Get(int tipo = 0)
        {
            return Ok(_service.GetUsers().Where(x=> tipo == 0 || (tipo != 0 && x.ID_TIPOUSUARIO == tipo)).Select(x => _mapper.Map<UserResult>(x)));
        }

        // GET: api/Users/5
        [HttpGet("{id}"), BasicAuthorization]
        public async Task<ActionResult<UserResult>> GetUser(int id)
        {
            try
            {
                return _mapper.Map<UserResult>(_service.Get(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }            
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, BasicAuthorization]
        public async Task<ActionResult<User>> PostUser(UserCommand user)
        {
            var newUser = _mapper.Map<User>(user);
            _context.User.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new UserResult { Id = newUser.ID_USU }, user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), BasicAuthorization]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> PutUser(int id, UserCommand user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            var oldUser = _mapper.Map<User>(user);

            _context.Entry(oldUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}"), BasicAuthorization]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.ID_USU == id);
        }
    }
}
