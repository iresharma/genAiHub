import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "@remix-run/react";

// Sample product data - replace with your actual data
export const allProducts = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    description:
      "Sleek, adjustable desk lamp with LED lighting and touch controls.",
    prompt: "Office essentials",
    badges: ["New", "Featured"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    description:
      "Premium sound quality with noise cancellation and long battery life.",
    prompt: "Audio devices",
    badges: ["Sale", "Popular"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 3,
    name: "Smart Watch",
    description:
      "Track fitness, receive notifications, and monitor health metrics.",
    prompt: "Wearable tech",
    badges: ["Limited"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 4,
    name: "Ergonomic Chair",
    description:
      "Comfortable office chair with lumbar support and adjustable features.",
    prompt: "Office furniture",
    badges: ["Featured"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 5,
    name: "Portable Charger",
    description:
      "High-capacity power bank for charging multiple devices on the go.",
    prompt: "Mobile accessories",
    badges: ["New", "Sale"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 20-hour battery life.",
    prompt: "Audio devices",
    badges: ["Popular"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    description: "Tactile typing experience with customizable RGB lighting.",
    prompt: "Computer peripherals",
    badges: ["New"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 8,
    name: "Wireless Mouse",
    description:
      "Ergonomic design with precision tracking and long battery life.",
    prompt: "Computer peripherals",
    badges: ["Sale"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 9,
    name: "Coffee Maker",
    description: "Programmable coffee machine with built-in grinder.",
    prompt: "Kitchen appliances",
    badges: ["Featured", "Limited"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
  {
    id: 10,
    name: "Air Purifier",
    description:
      "HEPA filter system that removes 99.97% of airborne particles.",
    prompt: "Home appliances",
    badges: ["New", "Featured"],
    image:
      "https://thefoomer.in/cdn/shop/products/PATP2846-min.jpg?v=1707384300",
  },
];

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <h6 className="text-md mb-6 text-muted-foreground">
            All the products in your catalog.
          </h6>
        </div>
        <div>
          <Link to="/app/product-create" viewTransition>
            <Button className="bg-primary rounded-xl" variant="default">
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Prompt</TableHead>
              <TableHead>Badges</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="rounded-xl object-cover shadow-xl p-2"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.description}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className="rounded-xl"
                        variant={getBadgeVariant(badge)}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            // Show first page, current page, last page, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalPages - 1) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// Helper function to determine badge variant based on badge type
function getBadgeVariant(
  badge: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (badge.toLowerCase()) {
    case "new":
      return "default";
    case "sale":
      return "destructive";
    case "featured":
      return "secondary";
    default:
      return "outline";
  }
}
