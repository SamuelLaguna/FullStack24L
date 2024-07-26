using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async  Task<IActionResult> Products()
        {
            // await Task.Delay(4000);
            return Ok(await _context.Products.AsNoTracking().ToListAsync());
        }


        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            if(product is null ) 
            {
                return BadRequest();
            }
            await  _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product is null){
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if(id != product.Id)
            {
                return BadRequest();

            }
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteProduct(int id)
        {
             var product = await _context.Products.FindAsync(id);
             if(product is null){
                return BadRequest();
             }

             _context.Products.Remove(product);
             await _context.SaveChangesAsync();
             return Ok(product);
        }

    }


    
    
}