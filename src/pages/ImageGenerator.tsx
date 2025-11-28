import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Download, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  timestamp: Date;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('dall-e-3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('vinony_images');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('vinony_images', JSON.stringify(history));
    }
  }, [history]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    // Simulate image generation (using a placeholder)
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt,
        url: `https://picsum.photos/seed/${Date.now()}/1024/1024`,
        timestamp: new Date(),
      };

      setCurrentImage(newImage.url);
      setHistory([newImage, ...history]);
      setIsGenerating(false);

      toast({
        title: 'Image generated!',
        description: 'Your image has been created successfully',
      });
    }, 3000);
  };

  const downloadImage = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `vinony-${prompt.slice(0, 20)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Downloaded!',
      description: 'Image saved to your device',
    });
  };

  const deleteImage = (id: string) => {
    setHistory(history.filter((img) => img.id !== id));
    toast({ title: 'Image deleted' });
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Image Generator</h1>
          <p className="text-muted-foreground">Create stunning visuals with AI</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generator Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="glass border-border/50">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Model</label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dall-e-3">DALL·E 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to create..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-full gradient-primary glow-primary hover:scale-105 transition-transform"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-5 h-5" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Current Image Preview */}
            {(currentImage || isGenerating) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="glass border-border/50 overflow-hidden">
                  <CardContent className="p-0">
                    {isGenerating ? (
                      <div className="aspect-square bg-gradient-primary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
                          <p className="text-muted-foreground">Creating your masterpiece...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={currentImage!}
                          alt="Generated"
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-4">
                          <Button
                            onClick={() => downloadImage(currentImage!, prompt)}
                            className="w-full gradient-primary glow-primary"
                          >
                            <Download className="mr-2 w-4 h-4" />
                            Download Image
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* History Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold">History</h2>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              <AnimatePresence>
                {history.length === 0 ? (
                  <Card className="glass border-border/50">
                    <CardContent className="p-12 text-center text-muted-foreground">
                      <p>Your generated images will appear here</p>
                    </CardContent>
                  </Card>
                ) : (
                  history.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="glass border-border/50 overflow-hidden group">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={image.url}
                              alt={image.prompt}
                              className="w-full aspect-square object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                              <div className="p-4 w-full">
                                <p className="text-white text-sm mb-3 line-clamp-2">
                                  {image.prompt}
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => downloadImage(image.url, image.prompt)}
                                    className="flex-1"
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => deleteImage(image.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ImageGenerator;
