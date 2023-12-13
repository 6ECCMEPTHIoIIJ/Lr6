using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lr6.Server;

namespace Lr6.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductStocksController : ControllerBase
    {
        private readonly Course3Context _context;

        public ProductStocksController(Course3Context context)
        {
            _context = context;
        }

        // GET: api/ProductStocks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductStock>>> GetProductStocks()
        {
            return await _context.ProductStocks.ToListAsync();
        }

        // GET: api/ProductStocks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductStock>> GetProductStock(int id)
        {
            var productStock = await _context.ProductStocks.FindAsync(id);

            if (productStock == null)
            {
                return NotFound();
            }

            return productStock;
        }

        // PUT: api/ProductStocks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductStock(int id, ProductStock productStock)
        {
            if (id != productStock.Id)
                return BadRequest();

            var modifiedProductStock = await _context.ProductStocks.FindAsync(id);
            if (modifiedProductStock == null)
                return NotFound();

            modifiedProductStock.Count = productStock.Count;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ProductStockExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/ProductStocks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductStock>> PostProductStock(ProductStock productStock)
        {
            ProductStock? containingValue;
            if ((containingValue = await _context.ProductStocks.FirstOrDefaultAsync(ps => ps.ProductId == productStock.ProductId && ps.StorageId == productStock.StorageId)) != null)
                await PutProductStock(containingValue.Id, new()
                {
                    Id = containingValue.Id,
                    Count = productStock.Count + containingValue.Count,
                });
            else
                _context.ProductStocks.Add(productStock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductStock", new { id = productStock.Id }, productStock);
        }

        // DELETE: api/ProductStocks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductStock(int id)
        {
            var productStock = await _context.ProductStocks.FindAsync(id);
            if (productStock == null)
            {
                return NotFound();
            }

            _context.ProductStocks.Remove(productStock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductStockExists(int id)
        {
            return _context.ProductStocks.Any(e => e.Id == id);
        }
    }
}
