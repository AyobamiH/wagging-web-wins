import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RunwareRequest {
  taskType: string
  apiKey: string
  positivePrompt?: string
  model?: string
  width?: number
  height?: number
  numberResults?: number
  outputFormat?: string
  CFGScale?: number
  scheduler?: string
  strength?: number
  taskUUID?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const RUNWARE_API_KEY = Deno.env.get('RUNWARE_API_KEY')
    if (!RUNWARE_API_KEY) {
      throw new Error('RUNWARE_API_KEY is not set')
    }

    const { prompt, filename } = await req.json()

    if (!prompt || !filename) {
      return new Response(
        JSON.stringify({ error: 'Missing prompt or filename' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Generating image for: ${filename}`)

    // Generate image using Runware API
    const taskUUID = crypto.randomUUID()
    
    const runwareRequest: RunwareRequest[] = [
      {
        taskType: "authentication",
        apiKey: RUNWARE_API_KEY
      },
      {
        taskType: "imageInference",
        taskUUID,
        positivePrompt: prompt,
        model: "runware:100@1",
        width: 1200,
        height: 630,
        numberResults: 1,
        outputFormat: "WEBP",
        CFGScale: 1,
        scheduler: "FlowMatchEulerDiscreteScheduler",
        strength: 0.8
      }
    ]

    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(runwareRequest)
    })

    if (!response.ok) {
      throw new Error(`Runware API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Runware response:', result)

    // Find the image inference result
    const imageResult = result.data?.find((item: any) => item.taskType === 'imageInference')
    
    if (!imageResult || !imageResult.imageURL) {
      throw new Error('No image generated')
    }

    // Download the image
    const imageResponse = await fetch(imageResult.imageURL)
    if (!imageResponse.ok) {
      throw new Error('Failed to download generated image')
    }

    const imageBlob = await imageResponse.blob()
    const imageBuffer = await imageBlob.arrayBuffer()

    return new Response(JSON.stringify({ 
      success: true,
      imageURL: imageResult.imageURL,
      filename,
      size: imageBuffer.byteLength
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in generate-pillar2-images function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})