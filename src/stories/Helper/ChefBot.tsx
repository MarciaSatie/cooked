import * as React from 'react';
import { useState, useEffect } from 'react';
import { generateRecipe, streamDecoder } from '../../../api/chat';

interface RecipeState {
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string[];
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChefBot() {
  // --- Recipe States ---
  const [recipeData, setRecipeData] = useState<RecipeState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fixed Chat States (Native React State) ---
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Initial Recipe Fetch
  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const data = await generateRecipe("Generate a simple recipe using salmon"); 
        setRecipeData(data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
        setError("Could not load recipe from the AI server.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, []);

  // --- Submit Form ---
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || isChatLoading) return;

    // 1. Instantly append the user message to history and clear the text input
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsChatLoading(true);

    try {
      // Fetch the text response stream context from your backend file and Decode it.
      // Return teh string message.
      const response = await streamDecoder(userText);

      // Set up a fresh message slot for the AI response
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: 'assistant', content: response }]);

    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: "Failed to read stream content from server context." }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Ai Response Test</h1>
      <br />
      <h2>API for AI Method (Structured JSON)</h2>

      {loading && <p>Thinking up a delicious salmon recipe...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
      {!loading && !error && recipeData && (
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px', fontSize: '12px' }}>
          {JSON.stringify(recipeData, null, 2)}
        </pre>
      )}

      <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ccc' }} />

      <h2>Chat Window (handleChat Streaming Method)</h2>

      {/* Chat History Container */}
      <div style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px', padding: '15px', minHeight: '150px', maxHeight: '300px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.length === 0 && <p style={{ color: '#888', margin: 0 }}>No messages yet. Say hello!</p>}
        {messages.map((m) => (
          <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#0070f3' : '#e1e1e1', color: m.role === 'user' ? 'white' : 'black', padding: '8px 12px', borderRadius: '8px', maxWidth: '70%', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
            <strong>{m.role === 'user' ? 'You: ' : 'ChefBot: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      {/* Input Action Panel Form */}
      <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)} // Native state handler removes typing lag completely
          placeholder="Say 'Hi' or ask a cooking question..."
          disabled={isChatLoading}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={isChatLoading || !input.trim()}
          style={{ padding: '10px 20px', borderRadius: '4px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {isChatLoading ? 'Typing...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
