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
    public class NtsController : ControllerBase
    {
        private readonly NtContext _context;

        public NtsController(NtContext context)
        {
            _context = context;
        }

        // GET: api/Nts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nt>>> GetNt()
        {
            return await _context.Nts.ToListAsync();
        }

        // GET: api/Nts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Nt>> GetNt(int id)
        {
            var nt = await _context.Nts.FindAsync(id);

            if (nt == null)
            {
                return NotFound();
            }

            return nt;
        }

        // PUT: api/Nts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNt(int id, Nt nt)
        {
            if (id != nt.ID)
            {
                return BadRequest();
            }

            _context.Entry(nt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NtExists(id))
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

        // POST: api/Nts
        [HttpPost]
        public async Task<ActionResult<Nt>> PostNt(Nt nt)
        {
            if (_context.Nts.Count() >= 10)
            {
                _context.Database.ExecuteSqlCommand("DELETE FROM Nts DBCC CHECKIDENT('Nts', RESEED, 0)");
            }

            _context.Nts.Add(nt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNt", new { id = nt.ID }, nt);
        }

        // DELETE: api/Nts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Nt>> DeleteNt(int id)
        {
            var nt = await _context.Nts.FindAsync(id);
            if (nt == null)
            {
                return NotFound();
            }

            _context.Nts.Remove(nt);
            await _context.SaveChangesAsync();

            return nt;
        }

        private bool NtExists(int id)
        {
            return _context.Nts.Any(e => e.ID == id);
        }
    }
}
