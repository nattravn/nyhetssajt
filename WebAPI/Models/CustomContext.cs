using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nyhetssajt.Models;

namespace Nyhetssajt.Models
{
    public class CustomContext : DbContext
    {
        public CustomContext(DbContextOptions<CustomContext> options) : base(options)
        {

        }

        public DbSet<Custom> Customs { get; set; }
    }
}
