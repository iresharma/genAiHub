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
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  products: {
    id: string;
    name: string;
    description: string;
    category: string;
    badges: string;
    productImage: string;
  }[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export function ProductList() {
  const { products, pagination } = useLoaderData<LoaderData>();
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const [isLoading, setIsLoading] = useState(false);

  // Parse badges from string to array
  const productsWithParsedBadges = products.map(product => ({
    ...product,
    badges: product.badges.split(',').map(badge => badge.trim()),
    image: product.productImage
  }));

  // Handle page change
  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?page=${page}&limit=${pagination.itemsPerPage}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      window.location.href = `/app/products?page=${page}&limit=${pagination.itemsPerPage}`;
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="rounded-xl border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Badges</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsWithParsedBadges.map((product) => (
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

          {Array.from({ length: pagination.totalPages }).map((_, index) => {
            const page = index + 1;

            // Show first page, current page, last page, and pages around current
            if (
              page === 1 ||
              page === pagination.totalPages ||
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
            if (page === 2 || page === pagination.totalPages - 1) {
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
                currentPage < pagination.totalPages && handlePageChange(currentPage + 1)
              }
              className={
                currentPage === pagination.totalPages
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
