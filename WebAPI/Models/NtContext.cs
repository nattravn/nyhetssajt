using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nyhetssajt.Models
{
    public class NtContext : DbContext
    {
        public NtContext(DbContextOptions<NtContext> options) : base(options)
        {

        }

        public DbSet<Nt> Nts { get; set; }

    }
}
