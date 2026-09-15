<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dec69f1a-51d1-44c4-8281-8f59bf285278

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Datos abiertos

El directorio [`open-data/`](open-data/) trae un pack abierto de datos de **modelos LLM (OpenRouter)** (fuente publica, sin clave de API).

```bash
python scripts/fetch_open_data.py   # regenera el pack
```

Ver [`open-data/README.md`](open-data/README.md) para fuente y licencia.

## Proyectos open similares

- [LiteLLM](https://github.com/BerriAI/litellm)
- [Portkey AI Gateway](https://github.com/Portkey-AI/gateway)
- [Bifrost](https://github.com/maximhq/bifrost)
- [Helicone](https://github.com/Helicone/helicone)
- [RouteLLM](https://github.com/lm-sys/RouteLLM)
