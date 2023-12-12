using System;
using System.Collections.Generic;

namespace Lr6.Server;

public partial class Supply
{
    public int Id { get; set; }

    public int? StorageId { get; set; }

    public DateOnly Date { get; set; }

    public virtual ICollection<PositionsInSupply> PositionsInSupplies { get; set; } = new List<PositionsInSupply>();

    public virtual Storage? Storage { get; set; }
}
