using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nyhetssajt.Models;
using System.Data.SqlClient;

namespace Nyhetssajt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomsController : ControllerBase
    {
        private readonly CustomContext _context;
        private int chunk = 0;

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

            if (id != custom.id)
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

        [HttpGet("source/{source}")]
        public async Task<ActionResult<IEnumerable<Custom>>> GetCustomBySource(string source)
        {


            return await _context.Customs.Where(b => b.source == source).ToListAsync();
        }

        // POST: api/Customs
        [HttpPost]
        public async Task<ActionResult<Custom>> PostCustom(Custom custom)
        {
            _context.Customs.Add(custom);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustom", new { id = custom.id }, custom);
        }

        // DELETE: api/Customs/5
        [HttpDelete("{name}")]
        public int DeleteCustom(string name)
        {
            var deletedRecords = new List<Custom>();

            int count = 0;
            Debug.WriteLine("name: " + name);
            count =_context.Customs.Where(b => b.source.ToLower() == name.ToLower()).ToList().Count();
            _context.Customs.RemoveRange(_context.Customs.Where(b => b.source.ToLower() == name.ToLower()));
            _context.SaveChanges();

            return count;
        }

        private bool CustomExists(int id)
        {
            return _context.Customs.Any(e => e.id == id);
        }
    }
}
