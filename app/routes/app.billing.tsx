import { Button } from "~/components/ui/button";
import { Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Coins, CreditCard, History, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { Slider } from "~/components/ui/slider";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Billing - GenAI Hub" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function BillingPage() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const [customTokens, setCustomTokens] = useState(1300);
  const customPricePerToken = 0.06; // $0.06 per token for custom plan

  const tokenBundles = [
    {
      name: "Starter",
      tokens: 100,
      price: "$10",
      description: "Perfect for trying out the platform",
      pricePerToken: "$0.10",
    },
    {
      name: "Plus",
      tokens: 500,
      price: "$40",
      description: "Most popular for regular users",
      pricePerToken: "$0.08",
      popular: true,
    },
    {
      name: "Custom",
      tokens: customTokens,
      price: `$${(customTokens * customPricePerToken).toFixed(2)}`,
      description: "Choose your own token amount",
      pricePerToken: "$0.06",
      isCustom: true,
    },
  ];

  // Mock data for token history
  const tokenHistory = [
    { date: "2024-03-15", action: "Purchase", tokens: 500, amount: "$40.00" },
    {
      date: "2024-03-14",
      action: "Usage",
      tokens: -50,
      description: "Product post generation",
    },
    {
      date: "2024-03-13",
      action: "Usage",
      tokens: -30,
      description: "Generic post generation",
    },
    { date: "2024-03-10", action: "Purchase", tokens: 100, amount: "$10.00" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Check your tokens usage and buy more.
        </p>
      </div>
      {/* Token Balance Card */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Token Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">420</div>
            <p className="text-muted-foreground">Available tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Usage This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">180</div>
            <p className="text-muted-foreground">Tokens used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Average Daily Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <p className="text-muted-foreground">Tokens/day</p>
          </CardContent>
        </Card>
      </div>

      {/* Token History */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Token History</CardTitle>
            <CardDescription>
              Your recent token transactions and usage
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={handleExportToExcel}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Tokens</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokenHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.action}</TableCell>
                  <TableCell
                    className={
                      record.tokens > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {record.tokens > 0 ? `+${record.tokens}` : record.tokens}
                  </TableCell>
                  <TableCell>{record.amount || record.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Purchase Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Tokens</CardTitle>
          <CardDescription>Select a token bundle to purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {tokenBundles.map((bundle) => (
              <Card
                key={bundle.name}
                className={`relative ${bundle.popular ? "border-primary" : ""}`}
              >
                {bundle.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{bundle.name}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{bundle.price}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">{bundle.tokens}</span>{" "}
                      tokens
                      <span className="text-sm">
                        {" "}
                        ({bundle.pricePerToken}/token)
                      </span>
                    </div>
                    {bundle.isCustom && (
                      <div className="mt-4">
                        <Slider
                          value={[customTokens]}
                          onValueChange={(value) => setCustomTokens(value[0])}
                          min={1000}
                          max={10000}
                          step={100}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={
                      selectedBundle === bundle.name ? "outline" : "default"
                    }
                    className="w-full rounded-xl"
                    onClick={() => setSelectedBundle(bundle.name)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const handleExportToExcel = () => {
  // no-op
};
