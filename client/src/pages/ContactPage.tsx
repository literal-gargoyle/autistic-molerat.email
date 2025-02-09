import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container py-8 max-w-screen-xl mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Get in touch with the Autistic Molerat team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              We'd love to hear from you! You can reach us through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:support@autistic-molerat.email" className="text-blue-500 underline">support@autistic-molerat.email</a></li>
              <li>GitHub: <a href="https://github.com/literal-gargoyle/autistic-molerat.email" className="text-blue-500 underline">https://github.com/literal-gargoyle/autistic-molerat.email</a></li>
              <li>Discord: discord.gg/autistic-molerat</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Note: This is a beta version of the platform. We appreciate your feedback and suggestions!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
