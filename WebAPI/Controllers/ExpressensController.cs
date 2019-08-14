using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CodeHollow.FeedReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nyhetssajt.Models;


namespace Nyhetssajt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpressensController : ControllerBase
    {
        private readonly ExpressenContext _context;

        public ExpressensController(ExpressenContext context)
        {
            _context = context;
        }

        // GET: api/Expressens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expressen>>> GetExpressens()
        {
            Debug.WriteLine("get feeds");
            return await _context.Expressens.ToListAsync();
        }

        // GET: api/Expressens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expressen>> GetExpressen(int id)
        {
            var expressen = await _context.Expressens.FindAsync(id);

            if (expressen == null)
            {
                return NotFound();
            }

            return expressen;
        }

        // PUT: api/Expressens/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpressen(int id, Expressen expressen)
        {
            Debug.WriteLine("Update feed");
            if (id != expressen.ID)
            {
                return BadRequest();
            }

            _context.Entry(expressen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpressenExists(id))
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

        // POST: api/Expressens
        [HttpPost]
        public async Task<ActionResult<Expressen>> PostExpressen(Expressen expressen)
        {
            if (_context.Expressens.Count() >= 10)
            {
                _context.Database.ExecuteSqlCommand("DELETE FROM Expressens DBCC CHECKIDENT('Expressens', RESEED, 0)");
            }

            _context.Expressens.Add(expressen);
            await _context.SaveChangesAsync();

            Debug.WriteLine("2. expressen.id: " + expressen.ID);




            return CreatedAtAction("GetExpressen", new { id = expressen.ID }, expressen);
        }

        // DELETE: api/Expressens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Expressen>> DeleteExpressen(int id)
        {
            var expressen = await _context.Expressens.FindAsync(id);
            if (expressen == null)
            {
                return NotFound();
            }

            _context.Expressens.Remove(expressen);
            await _context.SaveChangesAsync();

            return expressen;
        }

        private bool ExpressenExists(int id)
        {
            return _context.Expressens.Any(e => e.ID == id);
        }
    }
}
