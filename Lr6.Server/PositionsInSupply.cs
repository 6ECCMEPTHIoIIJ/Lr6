using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class PositionsInSupply
{
    public int Id { get; set; }

    public int? Count { get; set; }

    public int? SupplyId { get; set; }

    public int? ProductId { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Supply? Supply { get; set; }
}
