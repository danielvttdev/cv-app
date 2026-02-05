from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
import os
import logging
import mercadopago
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info(f"Loading application from: {__file__}")

app = FastAPI()

# Load env from current directory of this file
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

# Initialize Mercado Pago SDK
mp_token = os.getenv("MP_ACCESS_TOKEN")
if not mp_token:
    logger.warning("MP_ACCESS_TOKEN not found in environment!")
else:
    logger.info(f"MP_ACCESS_TOKEN loaded: {mp_token[:10]}...")

try:
    sdk = mercadopago.SDK(mp_token)
    logger.info("Mercado Pago SDK initialized successfully")
except Exception as e:
    logger.error(f"Error initializing Mercado Pago SDK: {e}")

# Mount static files
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")

# Templates
templates_path = os.path.join(os.path.dirname(__file__), "templates")
templates = Jinja2Templates(directory=templates_path)



@app.get("/", response_class=HTMLResponse)
async def read_landing(request: Request):
    return templates.TemplateResponse("landing.html", {"request": request})

@app.get("/builder", response_class=HTMLResponse)
async def read_builder(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/privacy", response_class=HTMLResponse)
async def read_privacy(request: Request):
    return templates.TemplateResponse("privacy.html", {"request": request})

@app.get("/refund", response_class=HTMLResponse)
async def read_refund(request: Request):
    return templates.TemplateResponse("refund.html", {"request": request})

@app.post("/pay")
async def create_payment_preference():
    logger.info("Starting payment preference creation")
    
    try:
        # Base URL for redirects - use environment variable for production
        base_url = os.getenv("BASE_URL", "http://127.0.0.1:8000")
        
        # 1. Define preference data
        # Documentation: https://www.mercadopago.com.ar/developers/es/reference/preferences/_checkout_preferences/post
        preference_data = {
            "items": [
                {
                    "id": "premium-subscription",
                    "title": "Suscripción Premium NexMavin",
                    "description": "Acceso completo a plantillas ATS Premium",
                    "quantity": 1,
                    "unit_price": 100.00,
                    "currency_id": "ARS"
                }
            ],
            "back_urls": {
                "success": f"{base_url}/builder", 
                "failure": f"{base_url}/",
                "pending": f"{base_url}/"
            },
            "auto_return": "approved",
            "binary_mode": True,  # Only approved or rejected, no pending
        }
        
        logger.info(f"Preference data: {preference_data}")

        # 2. Create preference
        # The SDK creates the request to /checkout/preferences
        preference_response = sdk.preference().create(preference_data)
        
        # 3. Inspect response
        logger.info(f"MP Response Status: {preference_response.get('status')}")

        if preference_response["status"] == 201:
            result = preference_response["response"]
            logger.info(f"Preference created successfully. ID: {result['id']}")
            
            return {
                "id": result["id"],
                "sandbox_init_point": result["sandbox_init_point"],
                "init_point": result["init_point"]
            }
        else:
            logger.error(f"Failed to create preference: {preference_response}")
            raise HTTPException(status_code=500, detail="Error creating Mercado Pago preference")
            
    except Exception as e:
        import traceback
        logger.error(f"Exception in /pay: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# Log registered routes
for route in app.routes:
    logger.debug(f"Registered route: {route.path}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
