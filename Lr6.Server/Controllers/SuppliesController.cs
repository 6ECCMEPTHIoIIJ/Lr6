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
    [ApiController]
    [Route("[controller]")]
    public class SuppliesController : ControllerBase
    {
        private readonly Course3Context _context;

        public SuppliesController(Course3Context context)
        {
            _context = context;
        }

        // GET: api/Supplies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supply>>> GetSupplies()
        {
            return await _context.Supplies
                .Include(s => s.PositionsInSupplies)
                .ThenInclude(pis => pis.Product)
                .Include(s => s.Storage)
                .AsNoTracking()
                .ToListAsync();
        }

        // GET: api/Supplies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supply>> GetSupply(int id)
        {
            var supply = await _context.Supplies.FindAsync(id);

            if (supply == null)
            {
                return NotFound();
            }

            return supply;
        }

        // PUT: api/Supplies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupply(int id, Supply supply)
        {
            if (id != supply.Id)
            {
                return BadRequest();
            }

            _context.Entry(supply).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplyExists(id))
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

        // POST: api/Supplies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supply>> PostSupply(Supply supply)
        {
            _context.Supplies.Add(supply);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupply", new { id = supply.Id }, supply);
        }

        // DELETE: api/Supplies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupply(int id)
        {
            var supply = await _context.Supplies.FindAsync(id);
            if (supply == null)
            {
                return NotFound();
            }

            _context.Supplies.Remove(supply);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SupplyExists(int id)
        {
            return _context.Supplies.Any(e => e.Id == id);
        }
    }
}
