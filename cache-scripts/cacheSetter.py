import requests
import sys

"""
production url: https://df.bonzo.ai/api/cache-setter-api
staging url: https://stg-df.bonzo.ai/api/cache-setter-api
"""
def makeAjaxCall():
    print('https://{serverName}.bonzo.ai/api/cache-setter-api'.format(serverName=sys.argv[1]))
    r = requests.get('https://{serverName}.bonzo.ai/api/cache-setter-api'.format(serverName=sys.argv[1]))
    if(r.status_code):
        print("process execution completed successfully")
    else:
        print("process running failed....")

if __name__ == "__main__":
    makeAjaxCall()
