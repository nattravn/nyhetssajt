using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class SourceContext : DbContext
    {
        public SourceContext(DbContextOptions<SourceContext> options) : base(options)
        {

        }

        public DbSet<Source> Sources { get; set; }
    }

}
