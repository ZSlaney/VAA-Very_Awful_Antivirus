#process a folder of PE files and turn them into multiple csv files of imported DLLs and png images of the bytes
import pefile
from tqdm import tqdm
import os
import csv
import hashlib
import pandas as pd



HEADERFIELDS = [
    'e_magic','e_cblp','e_cp','e_crlc','e_cparhdr','e_minalloc','e_maxalloc','e_ss','e_sp','e_csum','e_ip','e_cs','e_lfarlc','e_ovno','e_oemid','e_oeminfo','e_lfanew',
    'Machine','NumberOfSections','TimeDateStamp','PointerToSymbolTable','NumberOfSymbols','SizeOfOptionalHeader','Characteristics',
    'Magic','MajorLinkerVersion','MinorLinkerVersion','SizeOfCode','SizeOfInitializedData','SizeOfUninitializedData','AddressOfEntryPoint','BaseOfCode','ImageBase','SectionAlignment','FileAlignment','MajorOperatingSystemVersion','MinorOperatingSystemVersion','MajorImageVersion','MinorImageVersion','MajorSubsystemVersion','MinorSubsystemVersion','Reserved1','SizeOfImage','SizeOfHeaders','CheckSum','Subsystem','DllCharacteristics','SizeOfStackReserve','SizeOfHeapReserve','SizeOfHeapCommit','LoaderFlags','NumberOfRvaAndSizes'
]
SECTION_FIELDS = [
    "Misc_VirtualSize",
    "VirtualAddress",
    "SizeOfRawData",
    "PointerToRawData",
    "PointerToRelocations",
    "PointerToLinenumbers",
    "NumberOfRelocations",
    "NumberOfLinenumbers",
    "Characteristics"
]
SECTIONSTOKEEP = ['.text', '.rdata', '.data', '.pdata', '.rsrc', '.reloc', '.tls', '.bss', '.idata', '.edata']

trained_dlls = ["advapi32.dll","ole32.dll","oleaut32.dll","psapi.dll","setupapi.dll","shlwapi.dll","pdh.dll","xmllite.dll","msvcr110.dll","msvcrt.dll","shell32.dll","ntdll.dll","api-ms-win-core-winrt-l1-1-0.dll","dui70.dll","msvcr100.dll","msvcp100.dll","version.dll","rpcrt4.dll","secur32.dll","userenv.dll","cabinet.dll","comctl32.dll","api-ms-win-core-com-l1-1-1.dll","api-ms-win-core-synch-l1-2-0.dll","api-ms-win-core-processthreads-l1-1-2.dll","api-ms-win-core-errorhandling-l1-1-1.dll","api-ms-win-core-libraryloader-l1-2-0.dll","api-ms-win-core-profile-l1-1-0.dll","api-ms-win-core-sysinfo-l1-2-1.dll","api-ms-win-core-string-l1-1-0.dll","api-ms-win-core-registry-l1-1-0.dll","api-ms-win-core-io-l1-1-1.dll","api-ms-win-core-path-l1-1-0.dll","api-ms-win-eventing-provider-l1-1-0.dll","api-ms-win-core-string-l2-1-0.dll","api-ms-win-eventing-controller-l1-1-0.dll","api-ms-win-core-file-l1-2-1.dll","netapi32.dll","api-ms-win-core-rtlsupport-l1-2-0.dll","api-ms-win-core-heap-l2-1-0.dll","api-ms-win-core-heap-l1-2-0.dll","api-ms-win-core-util-l1-1-0.dll","api-ms-win-core-memory-l1-1-2.dll","api-ms-win-core-debug-l1-1-1.dll","api-ms-win-core-handle-l1-1-0.dll","winmm.dll","resutils.dll","mpr.dll","crypt32.dll","dbghelp.dll","odbc32.dll","ws2_32.dll","sspicli.dll","wkscli.dll","netutils.dll","comdlg32.dll","msvcp110.dll","wtsapi32.dll","samcli.dll","wininet.dll","srvcli.dll","msvcp110_win.dll","api-ms-win-shcore-scaling-l1-1-1.dll","gdiplus.dll","api-ms-win-core-winrt-string-l1-1-0.dll","iphlpapi.dll","mfc42u.dll","atl.dll","powrprof.dll","framedynos.dll","wsock32.dll","propsys.dll","api-ms-win-core-apiquery-l1-1-0.dll","api-ms-win-core-shlwapi-legacy-l1-1-0.dll","iertutil.dll","uxtheme.dll","vssapi.dll","logoncli.dll","api-ms-win-core-localization-l1-2-1.dll","api-ms-win-core-console-l1-1-0.dll","api-ms-win-core-processenvironment-l1-2-0.dll","rasapi32.dll","winhttp.dll","msvcr90.dll","ntdsapi.dll","bcrypt.dll","api-ms-win-security-base-l1-2-0.dll","api-ms-win-security-lsapolicy-l1-1-0.dll","rtutils.dll","api-ms-win-core-winrt-error-l1-1-0.dll","msi.dll","ncrypt.dll","urlmon.dll","wintrust.dll","wldap32.dll","mapi32.dll","api-ms-win-core-winrt-error-l1-1-1.dll","winspool.drv","api-ms-win-core-heap-obsolete-l1-1-0.dll","api-ms-win-core-processenvironment-l1-1-0.dll","api-ms-win-core-processthreads-l1-1-0.dll","api-ms-win-core-synch-l1-1-0.dll","api-ms-win-security-base-l1-1-0.dll","api-ms-win-core-threadpool-l1-2-0.dll","api-ms-win-core-sysinfo-l1-1-0.dll","api-ms-win-core-windowserrorreporting-l1-1-0.dll","api-ms-win-service-core-l1-1-1.dll","api-ms-win-core-sidebyside-l1-1-0.dll","api-ms-win-core-delayload-l1-1-1.dll","appvisvsubsystems32.dll","vcruntime140.dll","api-ms-win-crt-time-l1-1-0.dll","api-ms-win-crt-runtime-l1-1-0.dll","api-ms-win-crt-filesystem-l1-1-0.dll","api-ms-win-crt-stdio-l1-1-0.dll","api-ms-win-crt-string-l1-1-0.dll","api-ms-win-crt-convert-l1-1-0.dll","api-ms-win-crt-heap-l1-1-0.dll","api-ms-win-crt-math-l1-1-0.dll","api-ms-win-crt-locale-l1-1-0.dll","api-ms-win-crt-utility-l1-1-0.dll","msimg32.dll","msvcp140.dll","appvisvsubsystems64.dll","msvcp120.dll","msvcr120.dll","opengl32.dll","engine.dll","mfc120u.dll","api-ms-win-shcore-obsolete-l1-1-0.dll","api-ms-win-core-string-obsolete-l1-1-0.dll","api-ms-win-core-kernel32-legacy-l1-1-1.dll","imm32.dll","api-ms-win-core-registry-l1-1-1.dll","qt5gui.dll","qt5core.dll","imagehlp.dll","oledlg.dll","olepro32.dll","oleacc.dll","devobj.dll","msvcp90.dll","sysdm.cpl","libgimp-2.0-0.dll","libgimpbase-2.0-0.dll","libgimpcolor-2.0-0.dll","libglib-2.0-0.dll","libintl-8.dll","shcore.dll","libgcc_s_seh-1.dll","libstdc++-6.dll","libfontconfig-1.dll","libgimpui-2.0-0.dll","libgimpwidgets-2.0-0.dll","libgobject-2.0-0.dll","libgtk-win32-2.0-0.dll","libgdk_pixbuf-2.0-0.dll","libcairo-2.dll","libgdk-win32-2.0-0.dll","libgio-2.0-0.dll","libgnutls-30.dll","libiconv-2.dll","libpcreposix-0.dll","libhdf5-9.dll","msvbvm60.dll","msvcp_win.dll","api-ms-win-crt-private-l1-1-0.dll","dwmapi.dll","wbemcomn.dll","api-ms-win-core-version-l1-1-0.dll","mswsock.dll","api-ms-win-eventing-classicprovider-l1-1-0.dll","api-ms-win-security-sddl-l1-1-0.dll","api-ms-win-core-synch-l1-2-1.dll","api-ms-win-security-provider-l1-1-0.dll","api-ms-win-core-timezone-l1-1-0.dll","api-ms-win-core-psapi-l1-1-0.dll","api-ms-win-core-console-l2-1-0.dll","api-ms-win-core-wow64-l1-1-0.dll","loadperf.dll","api-ms-win-core-libraryloader-l1-2-1.dll","api-ms-win-core-datetime-l1-1-1.dll","api-ms-win-service-management-l1-1-0.dll","api-ms-win-service-management-l2-1-0.dll","api-ms-win-eventing-consumer-l1-1-0.dll","dnsapi.dll","dmcmnutils.dll","omadmapi.dll","api-ms-win-core-file-l2-1-2.dll","api-ms-win-power-setting-l1-1-0.dll","combase.dll","api-ms-win-core-threadpool-legacy-l1-1-0.dll","msys-1.0.dll","msys-intl-8.dll","api-ms-win-core-localization-l1-2-2.dll","cryptsp.dll","wer.dll","url.dll","avicap32.dll","ulib.dll","winscard.dll","avifil32.dll","mfc42.dll","msvcp60.dll","mscms.dll","shfolder.dll","msacm32.dll","webservices.dll","normaliz.dll","wsnmp32.dll","msvfw32.dll","rtm.dll","api-ms-win-core-memory-l1-1-0.dll","api-ms-win-core-console-l3-2-0.dll","api-ms-win-core-localization-l1-2-0.dll","api-ms-win-core-errorhandling-l1-1-0.dll","api-ms-win-core-processthreads-l1-1-1.dll","api-ms-win-core-interlocked-l1-1-0.dll","api-ms-win-core-debug-l1-1-0.dll","api-ms-win-core-rtlsupport-l1-1-0.dll","api-ms-win-core-file-l1-1-0.dll","api-ms-win-core-heap-l1-1-0.dll","api-ms-win-ntuser-sysparams-l1-1-0.dll","odbccp32.dll","api-ms-win-core-memory-l1-1-3.dll","api-ms-win-core-datetime-l1-1-0.dll","api-ms-win-core-fibers-l1-1-0.dll","api-ms-win-core-file-l2-1-0.dll","api-ms-win-core-sysinfo-l1-2-0.dll","wdscore.dll","api-ms-win-core-com-l1-1-0.dll","api-ms-win-security-lsalookup-l1-1-0.dll","api-ms-win-service-winsvc-l1-1-0.dll","api-ms-win-core-io-l1-1-0.dll","api-ms-win-core-delayload-l1-1-0.dll","api-ms-win-core-kernel32-legacy-l1-1-0.dll","api-ms-win-core-processthreads-l1-1-3.dll","api-ms-win-core-wow64-l1-1-1.dll","api-ms-win-core-registry-l2-1-0.dll","api-ms-win-core-namedpipe-l1-1-0.dll","api-ms-win-core-shlwapi-obsolete-l1-1-0.dll","api-ms-win-core-version-l1-1-1.dll","libcrypto.dll","api-ms-win-eventlog-legacy-l1-1-0.dll","api-ms-win-rtcore-ntuser-window-l1-1-0.dll","api-ms-win-core-errorhandling-l1-1-2.dll","api-ms-win-core-file-l1-2-3.dll","api-ms-win-shcore-taskpool-l1-1-0.dll","api-ms-win-security-lsalookup-l2-1-0.dll","vcruntime140_1.dll","ifsutil.dll","api-ms-win-core-commandlinetoargv-l1-1-0.dll","bcd.dll","api-ms-win-stateseparation-helpers-l1-1-0.dll","profapi.dll","api-ms-win-core-localization-obsolete-l1-2-0.dll","api-ms-win-shell-shdirectory-l1-1-0.dll","libwiretap.dll","libwsutil.dll","glib-2.0-0.dll","api-ms-win-core-toolhelp-l1-1-0.dll","api-ms-win-service-core-l1-1-0.dll","api-ms-win-core-libraryloader-l1-1-0.dll","api-ms-win-devices-config-l1-1-1.dll","api-ms-win-core-realtime-l1-1-0.dll","api-ms-win-core-file-l1-2-0.dll","api-ms-win-core-featurestaging-l1-1-0.dll","duser.dll","api-ms-win-devices-query-l1-1-0.dll","api-ms-win-shcore-stream-l1-1-0.dll","api-ms-win-appmodel-runtime-l1-1-0.dll","api-ms-win-core-privateprofile-l1-1-0.dll","dmenrollengine.dll"]
PE_HeaderImportantFeatures = ['TimeDateStamp', 'Machine', 'Magic', 'DllCharacteristics', 'SizeOfImage', 'SizeOfOptionalHeader', 'Characteristics', 'ImageBase', 'SizeOfCode', 'MajorSubsystemVersion', 'AddressOfEntryPoint', 'MajorOperatingSystemVersion', 'SizeOfInitializedData', 'CheckSum', 'MajorLinkerVersion', 'SectionAlignment', 'Subsystem', 'BaseOfCode', 'e_lfanew', 'SizeOfStackReserve']
PE_SectionImportantFeatures = ['pdata_PointerToRawData', 'rsrc_Misc_VirtualSize', 'pdata_SizeOfRawData', 'reloc_PointerToRawData', 'pdata_VirtualAddress', 'text_Misc_VirtualSize', 'pdata_Misc_VirtualSize', 'rsrc_SizeOfRawData', 'rsrc_PointerToRawData', 'pdata_Characteristics', 'reloc_VirtualAddress', 'text_SizeOfRawData', 'reloc_SizeOfRawData', 'rsrc_VirtualAddress', 'text_PointerToRawData', 'reloc_Misc_VirtualSize', 'data_Misc_VirtualSize', 'bss_Characteristics', 'data_PointerToRawData', 'rdata_Misc_VirtualSize', 'data_SizeOfRawData', 'data_VirtualAddress', 'idata_Characteristics']



#make operation tmp folder for intermediate files

#hash file for id
#for each file 
# loads PE file
#fetches the imported DLLs and appends them to a list, documenting
# the file it came from
founddlls = []
foundsectionattributes = []
foundheaderattributes = []
pes = {} #JSON with has as id and associated dlls id:hash , has dlls:[],  has header:{}, has sections:{}


def AddDLL(dll):
    if dll not in founddlls:
        founddlls.append(dll)

def AddHeaderAttributes(attr):
    if attr not in foundheaderattributes:
        foundheaderattributes.append(attr)

def AddSectionAttributes(attr):
    if attr not in foundsectionattributes:
        foundsectionattributes.append(attr)


def process_pe_file(file_path):
    try:
        pe = pefile.PE(file_path)
        #hash the file for id
        file_hash = hash_file(file_path)
        filedlls = getDLLs(pe)
        fileheader = getHeader(pe)
        filesections = getSections(pe)
        if fileheader and filesections is not None:
            pes[file_hash] = {
                "type": type,
                "DLLs": filedlls.copy(),
                "Header": fileheader.copy(),
                "Sections": filesections.copy()
            }
        else:
            pes[file_hash] = {}
            print(f"Skipping file {file_path} due to missing header or sections.")
        
    except pefile.PEFormatError:
        print(f"Error: {file_path} is not a valid PE file.")

def getDLLs(pe):
    filedlls = []
    try:
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            dll = entry.dll.decode().lower()
            AddDLL(dll)
            filedlls.append(dll)
        return filedlls
    except AttributeError:
        print(f"No import directory found")
        return []
    

def getHeader(pe):
    header = {}
    try:
        # DOS Header
        dos = pe.DOS_HEADER
        for field in HEADERFIELDS[:17]:
            try:
                header[field] = getattr(dos, field, None)
                if header[field] is None:
                    print(f"Warning: {field} is None in DOS_HEADER")
                AddHeaderAttributes(field)
            except AttributeError:
               print(f"Attribute {field} not found in DOS_HEADER")

        # FILE HEADER
        file_hdr = pe.FILE_HEADER
        for field in HEADERFIELDS[17:24]:
            try:
                header[field] = getattr(file_hdr, field, None)
                if header[field] is None:
                    print(f"Warning: {field} is None in FILE_HEADER")
                AddHeaderAttributes(field)
            except AttributeError:
                print(f"Attribute {field} not found in FILE_HEADER")
        # OPTIONAL HEADER
        opt_hdr = pe.OPTIONAL_HEADER
        for field in HEADERFIELDS[24:]:
            try:
                header[field] = getattr(opt_hdr, field, None)
                if header[field] is None:
                    print(f"Warning: {field} is None in OPTIONAL_HEADER")
                AddHeaderAttributes(field)
            except AttributeError:
                print(f"Attribute {field} not found in OPTIONAL_HEADER")
        return header
    except AttributeError:
        print(f"No header found")
        return {}
    
def getSections(pe):
    #format as secname_secfield
    #each field is a column
    sec_info = {}
    try:
        for section in pe.sections:
            name = section.Name.decode().rstrip('\x00')
            if name not in SECTIONSTOKEEP:
                continue
            for field in SECTION_FIELDS:
                sec_info[f"{name.replace('.', '')}_{field}"] = getattr(section, field, 0)
                AddSectionAttributes(f"{name.replace('.', '')}_{field}")
        return sec_info
    except AttributeError:
        print(f"No sections found")
        return {}

def hash_file(file_path):
    
    hasher = hashlib.sha256()
    with open(file_path, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

# def generatecsv(filepath):
#     #create a csv with hash and dlls as columns where 0 means no import and 1 means import
    
#     try:
#         with open(filepath, mode='w', newline='') as f:
#             writer = csv.writer(f)
#             writer.writerow(header)
#             match type:
#                 case "dll":
#                     for file_hash, data in tqdm(pes.items(), desc="Writing CSV DLL rows"):
#                         dlls = data.get("DLLs", [])
#                         filetype = data.get("type", 0)
#                         row = writedllrow(file_hash, filetype, dlls)
#                         writer.writerow(row)
#                 case "header":
#                     for file_hash, data in tqdm(pes.items(), desc="Writing CSV Header rows"):
#                         header = data.get("Header", {})
#                         filetype = data.get("type", 0)
#                         row = writeheaderrow(file_hash, filetype, [header.get(attr, "0") for attr in foundheaderattributes])
#                         writer.writerow(row)
#                 case "section":
#                     for file_hash, data in tqdm(pes.items(), desc="Writing CSV Section rows"):
#                         sections = data.get("Sections", {})
#                         filetype = data.get("type", 0)
#                         row = writesectionrow(file_hash, filetype, [sections.get(attr, "0") for attr in foundsectionattributes])
#                         writer.writerow(row)
#                 case _:
#                     print(f"Unknown type: {type}")
#     except Exception as e:
#         print(f"Error writing CSV file: {e}")

def dict_to_panas(pes):
    op = pd.DataFrame

    #Create pd headers
    header = ["SHA256"] + HEADERFIELDS + SECTION_FIELDS + founddlls
    op.columns = header
    
    for file_hash, data in pes.items():
        dlls = data.get("DLLs", [])
        header = data.get("Header", {})
        sections = data.get("Sections", {})

        row = [file_hash, header, sections, dlls] 
    
    op["SHA256", HEADERFIELDS, SECTION_FIELDS, trained_dlls] 
    