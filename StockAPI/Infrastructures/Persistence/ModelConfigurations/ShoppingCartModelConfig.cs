using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockAPI.Domains.Models;

namespace StockAPI.Infrastructures.Persistence.ModelConfigurations
{
    public class ShoppingCartModelConfig : IEntityTypeConfiguration<ShoppingCart>
    {
        public void Configure(EntityTypeBuilder<ShoppingCart> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Amount)
                .IsRequired();

            builder.HasOne(x => x.Product)
                .WithOne(x => x.ShoppingCart);
        }
    }
}
