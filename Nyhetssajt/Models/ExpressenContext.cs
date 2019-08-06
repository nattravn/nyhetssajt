using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class ExpressenContext :DbContext
    {
        public ExpressenContext(DbContextOptions<ExpressenContext> options) : base(options)
        {

        }

        public DbSet<Expressen> Expressens { get; set; }
    }
}
