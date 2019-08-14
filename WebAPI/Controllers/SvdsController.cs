using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
    public class SvdsController : ControllerBase
    {
        private readonly SvdContext _context;

        public SvdsController(SvdContext context)
        {
            _context = context;
        }

        // GET: api/Svds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Svd>>> GetSvds()
        {
            return await _context.Svds.ToListAsync();
        }

        // GET: api/Svds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Svd>> GetSvd(int id)
        {
            var svd = await _context.Svds.FindAsync(id);

            if (svd == null)
            {
                return NotFound();
            }

            return svd;
        }

        // PUT: api/Svds/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSvd(int id, Svd svd)
        {
            if (id != svd.ID)
            {
                return BadRequest();
            }

            _context.Entry(svd).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SvdExists(id))
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

        // POST: api/Svds
        [HttpPost]
        public async Task<ActionResult<Svd>> PostSvd(Svd svd)
        {

            //Delete all the content in the table and RESEED id if the table contains more than 9 rows

            if (_context.Svds.Count() >= 10)
            {
                _context.Database.ExecuteSqlCommand("DELETE FROM Svds DBCC CHECKIDENT('Svds', RESEED, 0)");
            }


            _context.Svds.Add(svd);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSvd", new { id = svd.ID }, svd);
        }

        // DELETE: api/Svds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Svd>> DeleteSvd(int id)
        {
            var svd = await _context.Svds.FindAsync(id);
            if (svd == null)
            {
                return NotFound();
            }

            _context.Svds.Remove(svd);
            await _context.SaveChangesAsync();

            return svd;
        }

        private bool SvdExists(int id)
        {
            return _context.Svds.Any(e => e.ID == id);
        }
    }
}
