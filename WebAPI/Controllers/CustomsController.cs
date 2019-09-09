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
        [HttpDelete("{id}")]
        public async Task<ActionResult<Custom>> DeleteCustom(int id)
        {
            Debug.WriteLine("Delete id outside: " + id);

            var custom = await _context.Customs.FindAsync(id);
            _context.Customs.Remove(custom);
            await _context.SaveChangesAsync();

            for (int i = 1; i < 10; i++)
            {

                
                custom = await _context.Customs.FindAsync(id + i);
                if (custom == null)
                {
                    return NotFound();
                }

                _context.Customs.Remove(custom);
                await _context.SaveChangesAsync();
                Debug.WriteLine("Delete id: " + (id + i));

            }
            
            //List<Custom> l = _context.Customs.ToList();

            //int n = _context.Customs.Count();

            //var itemsToDelete = _context.Set<Custom>();
            //_context.Customs.RemoveRange(itemsToDelete);
            //_context.SaveChanges();

            //_context.Database.ExecuteSqlCommand("DELETE FROM Customs DBCC CHECKIDENT('Customs', RESEED,  0 )");

            //n = _context.Customs.Count();
            //Debug.WriteLine("n after: " + n);
            //Debug.WriteLine("List count: " + l.Count());

            //l.ForEach(item =>
            //{
            //    Custom c = new Custom();
            //    c.ImageURL = item.ImageURL;
            //    c.Info = item.Info;
            //    c.Link = item.Link;
            //    c.Rss = item.Rss;
            //    c.Source = item.Source;
            //    c.Text = item.Text;
            //    c.Title = item.Title;
            //    c.Date = item.Date;
            //    c.Category = item.Category;

            //    _context.Customs.Add(c);
            //});

            _context.SaveChanges();

            return custom;
        }

        private bool CustomExists(int id)
        {
            return _context.Customs.Any(e => e.id == id);
        }
    }
}
