"""Regression checks for browser generation. No inference, agents or dataset writes."""
import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch
from PIL import Image

os.environ['GRADIO_ANALYTICS_ENABLED']='False'
os.environ['VARIANTE']='capture_required'
os.environ['CAPTURE_GATE']='on'
spec=importlib.util.spec_from_file_location('image_space_under_test',Path(__file__).with_name('app.py'))
app=importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)


class BrowserGenerationTests(unittest.TestCase):
    def test_browser_needs_only_description_and_never_registers(self):
        image=Image.new('RGB',(16,16),'blue')
        with patch.object(app,'_generar',return_value=(image,'test-model')) as generate,patch.object(app,'_registrar_sesion') as register:
            actual,metadata=app.generar_imagen_web('A blue circle on white')
        self.assertIs(actual,image)
        self.assertEqual(json.loads(metadata)['estado'],'ok')
        generate.assert_called_once_with('A blue circle on white')
        register.assert_not_called()

    def test_mcp_keeps_required_context_validation(self):
        with patch.object(app,'_generar') as generate,patch.object(app,'_registrar_sesion') as register:
            with self.assertRaises(app.gr.Error):app.generar_imagen('A blue circle','')
        generate.assert_not_called();register.assert_not_called()

    def test_blank_description_rejected_in_browser(self):
        with patch.object(app,'_generar') as generate:
            with self.assertRaises(app.gr.Error):app.generar_imagen_web('  ')
        generate.assert_not_called()

    def test_generation_failure_does_not_register(self):
        with patch.object(app,'_generar',side_effect=app.gr.Error('test failure')),patch.object(app,'_registrar_sesion') as register:
            with self.assertRaises(app.gr.Error):app.generar_imagen_web('A blue circle')
        register.assert_not_called()

    def test_button_and_enter_use_separate_browser_route(self):
        fns=list(app.demo.fns.values())
        public=[fn for fn in fns if fn.api_visibility=='public']
        self.assertEqual([fn.api_name for fn in public],['generar_imagen'])
        self.assertIs(public[0].fn,app.generar_imagen)
        self.assertEqual(len(public[0].inputs),2)
        web=[fn for fn in fns if fn.fn is app.generar_imagen_web]
        self.assertEqual(len(web),2)
        self.assertTrue(all(fn.api_visibility=='private' and len(fn.inputs)==1 for fn in web))
        info=app.demo.get_api_info()
        self.assertEqual(list(info['named_endpoints']),['/generar_imagen'])

    def test_capture_gate_filters_unmarked_input(self):
        with patch.object(app,'CAPTURE_GATE','on'),patch.object(app,'HfApi') as api,patch.object(app,'_append_csv') as append,contextlib.redirect_stdout(io.StringIO()):
            app._registrar_sesion('synthetic-test-only')
        api.assert_not_called();append.assert_not_called()

    def test_capture_gate_off_branch_with_mocked_storage_only(self):
        fake=MagicMock()
        with patch.object(app,'CAPTURE_GATE','off'),patch.object(app,'CAPTURE_DATASET','test-only-unused'),patch.object(app,'HfApi',return_value=fake),patch.object(app,'_append_csv') as append,contextlib.redirect_stdout(io.StringIO()):
            app._registrar_sesion('synthetic-test-only')
        append.assert_called_once_with(fake,['','synthetic-test-only'])


if __name__=='__main__':unittest.main()
