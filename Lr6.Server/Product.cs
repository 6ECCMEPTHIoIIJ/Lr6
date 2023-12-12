using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string ImageUrl { get; set; } = null!;

    public virtual ICollection<PositionsInRequest> PositionsInRequests { get; set; } = new List<PositionsInRequest>();

    public virtual ICollection<PositionsInSupply> PositionsInSupplies { get; set; } = new List<PositionsInSupply>();

    public virtual ICollection<ProductStock> ProductStocks { get; set; } = new List<ProductStock>();
}
