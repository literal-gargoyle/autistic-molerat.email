import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Get in touch with the autistic-molerat team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Have questions, suggestions, or found a bug? We'd love to hear from you!
          </p>
          <div className="space-y-2">
            <h3 className="font-medium">Get in Touch:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create an issue on our <a href="#" className="text-primary hover:underline">GitHub repository</a></li>
              <li>Join our <a href="#" className="text-primary hover:underline">Discord community</a></li>
              <li>Email us at <a href="mailto:support@autistic-molerat.com" className="text-primary hover:underline">support@autistic-molerat.com</a></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
