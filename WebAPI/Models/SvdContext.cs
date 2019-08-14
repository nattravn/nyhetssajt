using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nyhetssajt.Models;

namespace Nyhetssajt.Models
{
    public class SvdContext : DbContext
    {
        public SvdContext(DbContextOptions<SvdContext> options) : base(options)
        {

        }

        public DbSet<Svd> Svds { get; set; }
    }
}
