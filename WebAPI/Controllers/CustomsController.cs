using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nyhetssajt.Models;

namespace Nyhetssajt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomsController : ControllerBase
    {
        private readonly CustomContext _context;

        public CustomsController(CustomContext context)
        {
            _context = context;
        }

        // GET: api/Customs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Custom>>> GetCustoms()
        {
            return await _context.Customs.ToListAsync();
        }

        // GET: api/Customs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Custom>> GetCustom(int id)
        {
            var custom = await _context.Customs.FindAsync(id);

            if (custom == null)
            {
                return NotFound();
            }

            return custom;
        }

        // PUT: api/Customs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustom(int id, Custom custom)
        {
            if (id != custom.ID)
            {
                return BadRequest();
            }

            _context.Entry(custom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomExists(id))
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

        // POST: api/Customs
        [HttpPost]
        public async Task<ActionResult<Custom>> PostCustom(Custom custom)
        {


            _context.Customs.Add(custom);
           
            //if (_context.Customs.Count() >= 100)
            //{
            //    _context.Database.ExecuteSqlCommand("DELETE FROM Customs DBCC CHECKIDENT('Customs', RESEED, 0)");
            //}

            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustom", new { id = custom.ID }, custom);
        }

        // DELETE: api/Customs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Custom>> DeleteCustom(int id)
        {
            var custom = await _context.Customs.FindAsync(id);
            if (custom == null)
            {
                return NotFound();
            }

            _context.Customs.Remove(custom);
            await _context.SaveChangesAsync();

            return custom;
        }

        private bool CustomExists(int id)
        {
            return _context.Customs.Any(e => e.ID == id);
        }
    }
}
