import requests

"""
production url: https://df.bonzo.ai/api/cache-setter-api
staging url: https://stg-df.bonzo.ai/api/cache-setter-api
"""
def makeAjaxCall():
    r = requests.get('https://df.bonzo.ai/api/cache-setter-api')
    if(r.status_code):
        print("process execution completed successfully")
    else:
        print("process running failed....")

if __name__ == "__main__":
    makeAjaxCall()
