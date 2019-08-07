using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nyhetssajt.Models;
using SimpleFeedReader;

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
            var reader = new FeedReader();
            var items = reader.RetrieveFeed("http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss");

            foreach (var i in items)
            {
                Console.WriteLine(string.Format("{0}\t{1}",
                        i.Date.ToString("g"),
                        i.Title
                ));
            }

            _context.Expressens.Add(expressen);
            await _context.SaveChangesAsync();

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
