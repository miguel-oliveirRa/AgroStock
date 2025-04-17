using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Context
{
    public class AppDbContext : DbContext
    {   
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products { get; set; }
    }
}