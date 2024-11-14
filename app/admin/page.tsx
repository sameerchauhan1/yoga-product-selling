"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Product {
   id: number;
   name: string;
   description: string;
   price: number;
   imageUrl: string;
}

export default function AdminPage() {
   const [activeTab, setActiveTab] = useState("products");
   const { toast } = useToast();

   // Product form state
   const [productName, setProductName] = useState("");
   const [productDescription, setProductDescription] = useState("");
   const [productPrice, setProductPrice] = useState("");
   const [productImageUrl, setProductImageUrl] = useState("");

   // Edit product state
   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

   // Products list state
   const [products, setProducts] = useState<Product[]>([]);

   // Blog post form state
   const [blogTitle, setBlogTitle] = useState("");
   const [blogContent, setBlogContent] = useState("");

   // Social media links form state
   const [facebookLink, setFacebookLink] = useState("");
   const [instagramLink, setInstagramLink] = useState("");
   const [twitterLink, setTwitterLink] = useState("");

   useEffect(() => {
      fetchProducts();
   }, []);

   const fetchProducts = async () => {
      const response = await fetch("/api/products");
      if (response.ok) {
         const data = await response.json();
         setProducts(data);
      }
   };

   const handleAddProduct = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const response = await fetch("/api/products", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: productName,
               description: productDescription,
               price: parseFloat(productPrice),
               imageUrl: productImageUrl,
            }),
         });

         if (response.ok) {
            toast({
               title: "Product added successfully",
               description: "The new product has been added to the database.",
            });
            // Reset form fields
            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setProductImageUrl("");
            fetchProducts();
         } else {
            throw new Error("Failed to add product");
         }
      } catch (error) {
         toast({
            title: "Error",
            description: "Failed to add product. Please try again.",
            variant: "destructive",
         });
      }
   };

   const handleEditProduct = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingProduct) return;

      try {
         const response = await fetch(`/api/products/${editingProduct.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: editingProduct.name,
               description: editingProduct.description,
               price: parseFloat(editingProduct.price.toString()),
               imageUrl: editingProduct.imageUrl,
            }),
         });

         if (response.ok) {
            toast({
               title: "Product updated successfully",
               description: "The product has been updated in the database.",
            });
            setEditingProduct(null);
            fetchProducts();
         } else {
            throw new Error("Failed to update product");
         }
      } catch (error) {
         toast({
            title: "Error",
            description: "Failed to update product. Please try again.",
            variant: "destructive",
         });
      }
   };

   const handleDeleteProduct = async (id: number) => {
      if (!confirm("Are you sure you want to delete this product?")) return;

      try {
         const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
         });

         if (response.ok) {
            toast({
               title: "Product deleted successfully",
               description: "The product has been removed from the database.",
            });
            fetchProducts();
         } else {
            throw new Error("Failed to delete product");
         }
      } catch (error) {
         toast({
            title: "Error",
            description: "Failed to delete product. Please try again.",
            variant: "destructive",
         });
      }
   };

   const handlePublishPost = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const response = await fetch("/api/blog", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title: blogTitle,
               content: blogContent,
            }),
         });

         if (response.ok) {
            toast({
               title: "Blog post published successfully",
               description: "The new blog post has been added to the database.",
            });
            // Reset form fields
            setBlogTitle("");
            setBlogContent("");
         } else {
            throw new Error("Failed to publish blog post");
         }
      } catch (error) {
         toast({
            title: "Error",
            description: "Failed to publish blog post. Please try again.",
            variant: "destructive",
         });
      }
   };

   const handleUpdateSocialLinks = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const response = await fetch("/api/social", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               facebook: facebookLink,
               instagram: instagramLink,
               twitter: twitterLink,
            }),
         });

         if (response.ok) {
            toast({
               title: "Social media links updated successfully",
               description:
                  "The social media links have been updated in the database.",
            });
         } else {
            throw new Error("Failed to update social media links");
         }
      } catch (error) {
         toast({
            title: "Error",
            description:
               "Failed to update social media links. Please try again.",
            variant: "destructive",
         });
      }
   };

   return (
      <div>
         <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
         <div className="mb-8">
            <Button
               onClick={() => setActiveTab("products")}
               variant={activeTab === "products" ? "default" : "outline"}
               className="mr-4"
            >
               Manage Products
            </Button>
            <Button
               onClick={() => setActiveTab("blog")}
               variant={activeTab === "blog" ? "default" : "outline"}
               className="mr-4"
            >
               Manage Blog
            </Button>
            <Button
               onClick={() => setActiveTab("social")}
               variant={activeTab === "social" ? "default" : "outline"}
            >
               Social Media Links
            </Button>
         </div>

         {activeTab === "products" && (
            <div>
               <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
               <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
                  <div>
                     <Label htmlFor="productName">Product Name</Label>
                     <Input
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        required
                     />
                  </div>
                  <div>
                     <Label htmlFor="productDescription">Description</Label>
                     <Textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Enter product description"
                        required
                     />
                  </div>
                  <div>
                     <Label htmlFor="productPrice">Price</Label>
                     <Input
                        id="productPrice"
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                     />
                  </div>
                  <div>
                     <Label htmlFor="productImageUrl">Product Image URL</Label>
                     <Input
                        id="productImageUrl"
                        type="url"
                        value={productImageUrl}
                        onChange={(e) => setProductImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        required
                     />
                  </div>
                  <Button type="submit">Add Product</Button>
               </form>

               <h2 className="text-2xl font-semibold mb-4">
                  Existing Products
               </h2>
               <div className="space-y-4">
                  {products.map((product) => (
                     <div key={product.id} className="border p-4 rounded-md">
                        <h3 className="text-xl font-semibold">
                           {product.name}
                        </h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <div className="mt-2">
                           <Dialog>
                              <DialogTrigger asChild>
                                 <Button
                                    variant="outline"
                                    className="mr-2"
                                    onClick={() => setEditingProduct(product)}
                                 >
                                    Edit
                                 </Button>
                              </DialogTrigger>
                              <DialogContent>
                                 <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                 </DialogHeader>
                                 <form
                                    onSubmit={handleEditProduct}
                                    className="space-y-4"
                                 >
                                    <div>
                                       <Label htmlFor="editProductName">
                                          Product Name
                                       </Label>
                                       <Input
                                          id="editProductName"
                                          value={editingProduct?.name || ""}
                                          onChange={(e) =>
                                             setEditingProduct((prev) =>
                                                prev
                                                   ? {
                                                        ...prev,
                                                        name: e.target.value,
                                                     }
                                                   : null
                                             )
                                          }
                                          placeholder="Enter product name"
                                          required
                                       />
                                    </div>
                                    <div>
                                       <Label htmlFor="editProductDescription">
                                          Description
                                       </Label>
                                       <Textarea
                                          id="editProductDescription"
                                          value={
                                             editingProduct?.description || ""
                                          }
                                          onChange={(e) =>
                                             setEditingProduct((prev) =>
                                                prev
                                                   ? {
                                                        ...prev,
                                                        description:
                                                           e.target.value,
                                                     }
                                                   : null
                                             )
                                          }
                                          placeholder="Enter product description"
                                          required
                                       />
                                    </div>
                                    <div>
                                       <Label htmlFor="editProductPrice">
                                          Price
                                       </Label>
                                       <Input
                                          id="editProductPrice"
                                          type="number"
                                          value={editingProduct?.price || ""}
                                          onChange={(e) =>
                                             setEditingProduct((prev) =>
                                                prev
                                                   ? {
                                                        ...prev,
                                                        price: parseFloat(
                                                           e.target.value
                                                        ),
                                                     }
                                                   : null
                                             )
                                          }
                                          placeholder="Enter price"
                                          required
                                       />
                                    </div>
                                    <div>
                                       <Label htmlFor="editProductImageUrl">
                                          Product Image URL
                                       </Label>
                                       <Input
                                          id="editProductImageUrl"
                                          type="url"
                                          value={editingProduct?.imageUrl || ""}
                                          onChange={(e) =>
                                             setEditingProduct((prev) =>
                                                prev
                                                   ? {
                                                        ...prev,
                                                        imageUrl:
                                                           e.target.value,
                                                     }
                                                   : null
                                             )
                                          }
                                          placeholder="Enter image URL"
                                          required
                                       />
                                    </div>
                                    <Button type="submit">
                                       Update Product
                                    </Button>
                                 </form>
                              </DialogContent>
                           </Dialog>
                           <Button
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                           >
                              Delete
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {activeTab === "blog" && (
            <div>
               <h2 className="text-2xl font-semibold mb-4">
                  Write New Blog Post
               </h2>
               <form onSubmit={handlePublishPost} className="space-y-4">
                  <div>
                     <Label htmlFor="blogTitle">Title</Label>
                     <Input
                        id="blogTitle"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="Enter blog post title"
                        required
                     />
                  </div>
                  <div>
                     <Label htmlFor="blogContent">Content</Label>
                     <Textarea
                        id="blogContent"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write your blog post content"
                        rows={10}
                        required
                     />
                  </div>
                  <Button type="submit">Publish Post</Button>
               </form>
            </div>
         )}

         {activeTab === "social" && (
            <div>
               <h2 className="text-2xl font-semibold mb-4">
                  Update Social Media Links
               </h2>
               <form onSubmit={handleUpdateSocialLinks} className="space-y-4">
                  <div>
                     <Label htmlFor="facebookLink">Facebook</Label>
                     <Input
                        id="facebookLink"
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                        placeholder="Enter Facebook page URL"
                     />
                  </div>
                  <div>
                     <Label htmlFor="instagramLink">Instagram</Label>
                     <Input
                        id="instagramLink"
                        value={instagramLink}
                        onChange={(e) => setInstagramLink(e.target.value)}
                        placeholder="Enter Instagram profile URL"
                     />
                  </div>
                  <div>
                     <Label htmlFor="twitterLink">Twitter</Label>
                     <Input
                        id="twitterLink"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                        placeholder="Enter Twitter profile URL"
                     />
                  </div>
                  <Button type="submit">Update Links</Button>
               </form>
            </div>
         )}
      </div>
   );
}
