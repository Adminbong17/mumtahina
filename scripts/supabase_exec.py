import os
import sys
import json
import urllib.request
import urllib.error

def load_env():
    env_file = os.path.join(os.getcwd(), '.env.local')
    env_vars = {}
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env_vars[k.strip()] = v.strip().strip('"').strip("'")
    return env_vars

def execute_sql(sql_query):
    env = load_env()
    
    token = os.environ.get('SUPABASE_ACCESS_TOKEN') or env.get('SUPABASE_ACCESS_TOKEN')
    project_ref = os.environ.get('SUPABASE_PROJECT_REF') or env.get('SUPABASE_PROJECT_REF')
    
    # Try extracting project ref from SUPABASE_URL if not directly provided
    supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL') or env.get('NEXT_PUBLIC_SUPABASE_URL') or ''
    if not project_ref and 'supabase.co' in supabase_url:
        # https://xyz.supabase.co -> xyz
        project_ref = supabase_url.replace('https://', '').replace('http://', '').split('.')[0]

    if not token or not project_ref:
        print("[ERROR] Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF in .env.local")
        print("Please set:")
        print("  SUPABASE_ACCESS_TOKEN=sbp_...")
        print("  SUPABASE_PROJECT_REF=...")
        print("(Get your token at: https://supabase.com/dashboard/account/tokens)")
        return False

    url = f"https://api.supabase.com/v1/projects/{project_ref}/database/query"
    payload = json.dumps({"query": sql_query}).encode('utf-8')
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'User-Agent': 'Antigravity-AI-Agent/1.0'
    }

    req = urllib.request.Request(url, data=payload, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read().decode('utf-8')
            res = json.loads(data) if data else {}
            print("[SUCCESS] SQL executed successfully in Supabase Cloud!")
            if isinstance(res, list):
                print(f"Returned {len(res)} rows.")
            elif res:
                print(json.dumps(res, indent=2)[:500])
            return True
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8', errors='ignore')
        print(f"[HTTP ERROR {e.code}]: {err_msg}")
        return False
    except Exception as e:
        print(f"[ERROR]: {e}")
        return False

if __name__ == '__main__':
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if os.path.exists(arg):
            with open(arg, 'r', encoding='utf-8') as f:
                query = f.read()
        else:
            query = " ".join(sys.argv[1:])
    else:
        # Default run schema.sql
        schema_path = os.path.join(os.getcwd(), 'supabase', 'schema.sql')
        if os.path.exists(schema_path):
            with open(schema_path, 'r', encoding='utf-8') as f:
                query = f.read()
        else:
            print("Usage: python scripts/supabase_exec.py [sql_file_path or 'SQL QUERY']")
            sys.exit(1)

    print("Executing SQL in Supabase Cloud...")
    success = execute_sql(query)
    sys.exit(0 if success else 1)
